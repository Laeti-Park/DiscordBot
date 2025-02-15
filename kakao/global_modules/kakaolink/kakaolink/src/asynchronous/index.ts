/*
 * MIT License
 *
 * Copyright (c) 2024 naijun0403
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Runnable = java.lang.Runnable;
import RuntimeException = java.lang.RuntimeException;
import Runtime = java.lang.Runtime;

export class PromiseLike<T> {
    private static readonly executorService: java.util.concurrent.ExecutorService =
        java.util.concurrent.Executors.newFixedThreadPool(
            Math.max(2, Runtime.getRuntime().availableProcessors())
        );

    private completionHandler: java.util.concurrent.CompletableFuture<T>;

    constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
        this.completionHandler = new java.util.concurrent.CompletableFuture<T>();
        executor(value => this.resolve(value), reason => this.reject(reason));
    }

    static resolve<T>(value: T): PromiseLike<T> {
        return new PromiseLike<T>((resolve, _reject) => resolve(value));
    }

    static reject<T>(reason: any): PromiseLike<T> {
        return new PromiseLike<T>((_resolve, reject) => reject(reason));
    }

    then(onFulfilled: (value: T) => void): PromiseLike<T> {
        this.completionHandler.thenAcceptAsync((T: any) => {
            onFulfilled(T);
        }, PromiseLike.executorService);
        return this;
    }

    catch(onRejected: (error: Error) => void): PromiseLike<T> {
        this.completionHandler.exceptionally((t: Error) => {
            onRejected(t);
            return null;
        });
        return this;
    }

    awaitResult(): T {
        try {
            return this.completionHandler.get();
        } catch (error) {
            throw new Error(`Error during async operation: ${error}`);
        }
    }

    finally(onFinally: () => void): PromiseLike<T> {
        this.completionHandler.whenCompleteAsync((_res: any, _err: any) => onFinally(), PromiseLike.executorService);
        return this;
    }

    private resolve(value: T): void {
        const promiseScope = this;
        PromiseLike.executorService.submit(new Runnable({
            run(): void {
                promiseScope.completionHandler.complete(value);
            }
        }));
    }

    private reject(reason: any): void {
        const promiseScope = this;
        PromiseLike.executorService.submit(new Runnable({
            run(): void {
                promiseScope.completionHandler.completeExceptionally(new RuntimeException(reason));
            }
        }));
    }

    static shutdown(): void {
        PromiseLike.executorService.shutdown();
        try {
            if (!PromiseLike.executorService.awaitTermination(60, java.util.concurrent.TimeUnit.SECONDS)) {
                PromiseLike.executorService.shutdownNow();
            }
        } catch (e) {
            PromiseLike.executorService.shutdownNow();
        }
    }
}