import yaml
import glob
import os

from slugify import slugify

for filename in glob.iglob('**/*.yml', recursive=True):
    with open(filename, 'r') as stream:
        content = yaml.safe_load(stream)
        categoryName = content['categoryName']
        items = content['list']
        for item in items:
            item['category'] = categoryName
            print(item)
            slug = slugify(item['name'])
            directory = f'flatten/{categoryName}'
            if not os.path.exists(directory):
                os.makedirs(directory)
            with open(f'{directory}/{slug}.yml', 'w') as outfile:
                yaml.dump(item, outfile, default_flow_style=False)