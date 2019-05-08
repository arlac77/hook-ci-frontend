import test from 'ava';
import { withPage, apiProxy } from './setup.mjs';

test('page title should contain "hook-ci"', withPage, async (t, page) => {
	await apiProxy();
	const url = 'http://localhost:3000';

	await page.goto(url);
	//console.log("TITLE",await page.title());

	t.true((await page.title()).includes('hook-ci'));
});

/*
test('page should contain an element with `#hplogo` selector', withPage, async (t, page) => {
	await page.goto(url);
	t.not(await page.$('#hplogo'), null);
});

test('search form should match the snapshot', withPage, async (t, page) => {
	await page.goto(url);
	const innerHTML = await page.evaluate(form => form.innerHTML, await page.$('#searchform'));
	t.snapshot(innerHTML);
});
*/
