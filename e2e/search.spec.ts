import { test, expect } from '@playwright/test'

test('Users can search for flights', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { level: 1, name: /Find your flight/ }),
  ).toBeVisible()

  const mainContent = await page.getByRole('main')

  // Get input field and enter a query
  const inputField = await mainContent.getByPlaceholder(
    'Enter your destination',
  )
  await inputField.fill('London')

  // Submit by clicking the submit button
  await mainContent.getByRole('button', { name: /Search/ }).click()

  // Check if all 5 results contain our search query
  await expect(mainContent.getByRole('link')).toHaveText([
    /London/,
    /London/,
    /London/,
    /London/,
    /London/,
  ])
})
