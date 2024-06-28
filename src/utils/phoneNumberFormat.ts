export const phoneNumberFormat = (phoneNumber: string): string => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(0|62)(\d{2,3})(\d{4})(\d{4})$/);
    if (match) {
        return `+62 ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber;
}
    