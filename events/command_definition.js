import {SlashCommandBuilder} from "@discordjs/builders";

const commandDefinition = [
    new SlashCommandBuilder().setName('명령어')
        .setDescription('블라썸봇 전체 명령어 목록')
        .toJSON(),
    new SlashCommandBuilder().setName('뽑기')
        .setDescription('랜덤 브롤러 뽑기')
        .addStringOption((option) =>
            option
                .setName('희귀도')
                .setDescription('희귀도를 설정합니다.')
                .addChoices(
                    {name: "희귀", value: "희귀"},
                    {name: "초희귀", value: "초희귀"},
                    {name: "영웅", value: "영웅"},
                    {name: "신화", value: "신화"},
                    {name: "전설", value: "전설"},
                    {name: "크로마틱", value: "크로마틱"})
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('역할군')
                .setDescription('역할군을 설정합니다.')
                .addChoices(
                    {name: "대미지 딜러", value: "대미지 딜러"},
                    {name: "탱커", value: "탱커"},
                    {name: "투척수", value: "투척수"},
                    {name: "저격수", value: "저격수"},
                    {name: "컨트롤러", value: "컨트롤러"},
                    {name: "어쌔신", value: "어쌔신"},
                    {name: "서포터", value: "서포터"})
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('성별')
                .setDescription('성별을 설정합니다.')
                .addChoices(
                    {name: "남성", value: "남성"},
                    {name: "여성", value: "여성"})
                .setRequired(false))
        .toJSON(),
    new SlashCommandBuilder().setName('프로필')
        .setDescription('프로필 확인')
        .addStringOption((option) =>
            option
                .setName('닉네임')
                .setDescription('닉네임을 설정합니다.')
                .setRequired(false))
        .toJSON(),
];

export default commandDefinition;