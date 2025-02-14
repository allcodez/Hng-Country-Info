import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const theme = {
    color: {
        darkText: '#1C1917',
        lightText: '#ffffff',
        labelText: '#000000b3',
        bgWhite: '#ffffff',
        bgBlack: '#000F24'
    },
    fontSize: {
        // small: width * 0.037, // Adjust the multiplier as needed
        medium: width * 0.039 ,
        large: width * 0.055,
    },
    font: {
        minimal: 'AxiformaRegular',
        bold: 'AxiformaSemiBold',
    }
};

export const lightTheme = {
    background: "#ffffff",
    text: "#000000",
    border: "#e0e0e0",
    placeholder: "#888",
    icon: "#000",
};

export const darkTheme = {
    background: "#121212",
    text: "#ffffff",
    border: "#333",
    placeholder: "#bbb",
    icon: "#fff",
};
