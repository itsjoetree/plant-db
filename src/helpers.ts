function upperCase(text: string) {
    const splitText = text.split('')
    splitText[0] = text.toUpperCase()[0]

    return splitText.join('')
}

export { upperCase }