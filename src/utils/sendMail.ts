export const sendMail = async (data: { name: string; email: string; message: string }) => {
    try {
        const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const sendMailNotificationBr = async (data: { id: string; title: string; deskripsi: string }) => {
    try {
        const response = await fetch('/api/sendMailNotificationBr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const sendMailNotificationKe = async (data: { id: string; title: string; deskripsi: string }) => {
    try {
        const response = await fetch('/api/sendMailNotificationKe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};