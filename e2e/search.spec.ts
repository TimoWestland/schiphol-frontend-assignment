import { test, expect } from '@playwright/test'

test('Users can search for flights', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { level: 1, name: /Find your flight/ }),
  ).toBeVisible()

  const mainContent = await page.getByRole('main')

  const inputField = mainContent.getByPlaceholder('Enter your destination')

  await inputField.fill('London')
  await mainContent.getByRole('button', { name: /Search/ }).click()

  await expect(mainContent.getByRole('link')).toHaveText([
    '14:40London GatwickBA 2761On scheduleDetails',
    '14:40London HeathrowKL 1019On scheduleDetails',
    '14:45London StanstedEZY 3004On scheduleDetails',
    '14:55London HeathrowBA 435On scheduleDetails',
    '15:05London GatwickEJU 8874On scheduleDetails',
  ])
})
