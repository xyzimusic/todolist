describe('addItemForm', () => {

    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        // @ts-ignore
        await page.goto('http://localhost:6006/iframe.html?id=additemform-component--add-item-form-base-example&viewMode=story',
            {waitUntil: "networkidle2"});

        // @ts-ignore
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

