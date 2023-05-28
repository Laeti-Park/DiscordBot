import {EmbedBuilder, SlashCommandBuilder} from "discord.js";

const embed = new EmbedBuilder()
    .setColor(0x2ECC70)
    .setTitle("<:Blossom_Icon:1015937865634549772> Blossom Bot 명령어 목록")
    .addFields({
        name: "플레이어 프로필 검색",
        value: "``/프로필 <닉네임>`` : 해당 플레이어의 프로필 정보를 보여줍니다."
    }, {
        name: "플레이어 브롤러 검색",
        value: "``/브롤러 <닉네임> <브롤러>`` : 해당 플레이어의 브롤러 정보를 보여줍니다."
    }, {
        name: "플레이어 브롤러 검색",
        value: "``/로테이션 <게임모드>`` : 로테이션 정보를 보여줍니다."
    }, {
        name: "랜덤 브롤러 뽑기",
        value: "``/뽑기 <희귀도> <역할군> <성별>`` : 현재 존재하는 브롤러 중 랜덤한 브롤러를 보여줍니다."
    }, {
        name: "연락처",
        value:
            "💬 카카오톡 : https://open.kakao.com/me/Laeti_Cre\n" +
            "🎤 디스코드 : 박동훈#0268"
    }).toJSON();

const helpCommand = {
    data: new SlashCommandBuilder()
        .setName('도움말')
        .setDescription('Blossom Bot 전체 명령어 목록을 보여준다.').toJSON(),
    async execute(interaction) {
        await interaction.reply({
            embeds: [embed]
        });
    }
};

export default helpCommand;