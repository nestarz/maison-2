import yaml
import glob
import os

import asyncio
from pyppeteer import launch, errors

from slugify import slugify

async def main():
    for filename in glob.iglob("**/*.yml", recursive=True):
        with open(filename, "r") as stream:
            content = yaml.safe_load(stream)
            category = content["category"]
            slug = slugify(content["name"])
            print(content.get("url", False))
            directory = f"{category}/screenshots/"
            if not os.path.exists(directory):
                os.makedirs(directory)
            imagename = f"{directory}/{slug}.png"
            if content.get("url", False) and not os.path.isfile(imagename):
                browser = await launch({"headless": True, "ignoreHTTPSErrors": True})
                page = await browser.newPage()
                try:
                    await page.goto(
                        content["url"],
                        {"waitUntil": "networkidle2", "ignoreHTTPSErrors": True},
                        timeout=10000
                    )
                except (errors.TimeoutError, errors.PageError):
                    print('Timeout')
                else:
                    await page.screenshot({"path": imagename})
                    await browser.close()
            elif os.path.isfile(imagename):
                print(imagename, ' exists.')


asyncio.get_event_loop().run_until_complete(main())
