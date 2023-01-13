const {
    EmbedBuilder
} = require('discord.js');

const commandEXE = new EmbedBuilder()
    .setColor(0x2ECC70)
    .setTitle("🤖Blossom 서버 봇 명령어 모음🤖")
    .addFields({
        name: '<:Blossom_Icon:1015937865634549772> Blossom',
        value: '프로필 정보 검색 : /프로필 (닉네임)\n' +
            '프로필 브롤러 검색 : /프로필 (닉네임)\n' +
            '랜덤 브롤러 뽑기 : /뽑기'
    }, {
        name: '🎶 노래봇(FredBoat)',
        value: '노래 재생 : ;play(;p) (노래제목 또는 url)\n' +
            '노래 스킵 : ;skip(;s)\n' +
            '반복 재생 : ;repeat\n' +
            '현재 노래 정보 : ;np\n' +
            '재생 목록 : ;queue(;q)\n' +
            '재생 목록 섞기 : ;shuffle(;sh)\n' +
            '일시 정지 : ;pause\n' +
            '다시 재생 : ;resume(;re)\n' +
            '노래 정지 : ;stop(;st)'
    }, {
        name: '🎶 토비봇(노래하는하리보)',
        value: '노래 재생 : !play(!p) (노래제목 또는 url)\n' +
            '노래 스킵 : !skip(!s)\n' +
            '반복 재생 : !repeat\n' +
            '현재 노래 정보 : !np\n' +
            '재생 목록 : !queue(!q)\n' +
            '재생 목록 섞기 : !shuffle(!sh)\n' +
            '일시 정지 : !pause\n' +
            '다시 재생 : !resume(!re)\n' +
            '노래 정지 : !stop(!st)'
    });

module.exports = commandEXE;