const breakpoints = {
    xs: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};

const header_height = '64px';
const footer_height = '70px';

const grid = {
    container: '130rem',
    gutter: '3.2rem',
};
const border = {
    radius: '0.4rem',
};
const font = {
    family:
        "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, " +
        "'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
        xsmall: '1.2rem',
        small: '1.4rem',
        medium: '1.6rem',
        large: '1.8rem',
        xlarge: '2.0rem',
        xxlarge: '2.8rem',
    },
};
const colors = {
    primary: '#1B72E5',
    secondary: '#FD6000',
    white: '#FAFAFA',
    gray: '#7f7e82',
    black: '#2E2F42',
    red: '#FF0000',
    green: '#00ff00',
    orange: '#FFA500',
    blue: '#0000ff',
    dark_gray: '#696969',
    purple: '#800080',
    warning: '#fb5607',
    ligth_blue: '#09a6f3',
    light_gray: '#f3f3f3',
    blue_1: '#006598',
    blue_2: '#0075BE',
    blue_3: '#00A1E0',
    blue_4: '#3FC0F0',
    yellow_1: '#F07D00',
    yellow_2: '#F9B000',
    yellow_3: '#FFC500',
    yellow_4: '#FEDA6F',
    green_1: '#009A93',
    green_2: '#01A7A7',
    green_3: '#48BCBD',
    green_4: '#89CDD3',
    red_1: '#BD1224',
    red_2: '#E61936',
    red_3: '#EA4F45',
    red_4: '#F18D6E',
};
const graphColors = {
    alcance: colors.orange,
    frequencia: colors.red,
    tarp: colors.ligth_blue,
};
const spacings = {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem',
};
export default {
    breakpoints,
    grid,
    border,
    font,
    colors,
    graphColors,
    spacings,
    header_height,
    footer_height,
};

export const ColorValues = Object.keys(colors) as Array<keyof typeof colors>;
