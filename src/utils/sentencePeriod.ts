export const formatContentWithBreaks = (text: string) => {
    const sentences = text.split('. '); 
    return sentences[Math.floor(Math.random() * sentences.length)];
};