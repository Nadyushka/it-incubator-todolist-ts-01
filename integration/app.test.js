describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-story&viewMode=storyyarn test:integration')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
