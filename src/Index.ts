import express from 'express';
import fs from 'fs';

const app = express()
const port = process.env.NODE_PORT || 3000;
const data = fs.readFileSync('messages.txt', 'utf8').split('\n');

app.get('/', (req, res) => {
    try {
        const now = new Date();
        console.log(`${now.toISOString()} - ${JSON.stringify(req.query)}`);

        let count: number = req.query.count ? parseInt(req.query.count as string, 10) : 1;
        if (count > 10 || count < 0 || isNaN(count)) {
            return res.status(400).json({
                success: false,
                message: 'invalid count parameter, must be number <= 10',
            });
        }

        res.json({
            success: true,
            data: pickPhrases(count)
        });
    } catch (e) {
        console.error('error', e)
        return res.status(500);
    }
})

function pickPhrases(num: number): string[] {
    let phrases: string[] = [];
    for (let i = 0; i < num; i++) {
        let phrase: string | undefined;
        while (!phrase || phrases.includes(phrase)) {
            phrase = pickPhrase();
        }

        phrases.push(phrase);
    }
    return phrases;
}

function pickPhrase() {
    return data[Math.floor(Math.random() * data.length)];

}

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
