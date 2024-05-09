import re
import unicodedata
import scrapy
from yattag import Doc


#NLT edge case...
nlt_edge_cases = {
    "REV.7.NLT:5": "from Judah 12,000, from Reuben 12,000, from Gad 12,000",
    "REV.7.NLT:6": "from Asher 12,000, from Naphtali, 12,000, from Manasseh 12,000",
    "REV.7.NLT:7": "from Simeon 12,000, from Levi 12,000, from Issachar 12,000",
    "REV.7.NLT:8": "from Zebulun 12,000, from Joseph 12,000, from Benjamin 12,000"
}

def str_ref_to_list(ref_replacement):
    short_names = {
        'ܡܬܝ': 'MAT',
        'ܡܪܩܘܣ': 'MRK',
        'ܠܘܩܐ': 'LUK',
        'ܝܘܚܢܢ': 'JHN',
        'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ': 'ACT',
        'ܐ ܩܘܪ̈ܢܬܝܐ': '1CO',
    }
    for aii_book_name, short_name in short_names.items():
        if ref_replacement.startswith(aii_book_name):
            split = ref_replacement.split('‏')
            if len(split) == 3:
                # range of verses
                values = [
                    short_name,
                    split[0].split(' ')[-1],
                    split[1].split(':')[-1],
                    split[2].split('-')[-1]
                ]
                return values
            if len(split) == 2:
                # single verse
                values = [
                    short_name,
                    split[0].split(' ')[-1],
                    split[1].split(':')[-1],
                    split[1].split(':')[-1]
                ]
                return values
            raise ValueError('the reference is syntactically invalid')

ref_replacements = [
    # Mark 1
    'ܡܬܝ 3‏:1‏-12',
    'ܠܘܩܐ 3‏:1‏-9',
    'ܝܘܚܢܢ 1‏:19‏-28',
    'ܡܬܝ 3‏:13‏-17',
    'ܠܘܩܐ 3‏:21‏-22',
    'ܡܬܝ 4‏:1‏-11',
    'ܠܘܩܐ 4‏:1‏-13',
    'ܡܬܝ 4‏:12‏-17',
    'ܠܘܩܐ 4‏:14‏-15',
    'ܡܬܝ 4‏:18‏-22',
    'ܠܘܩܐ 5‏:1‏-11',
    'ܠܘܩܐ 4‏:31‏-37',
    'ܡܬܝ 8‏:14‏-17',
    'ܠܘܩܐ 4‏:38‏-41',
    'ܠܘܩܐ 4‏:42‏-44',
    'ܡܬܝ 8‏:1‏-4',
    'ܠܘܩܐ 5‏:12‏-16',

    # Mark 2
    'ܡܬܝ 9‏:1‏-8',
    'ܠܘܩܐ 5‏:17‏-26',
    'ܡܬܝ 9‏:9‏-13',
    'ܠܘܩܐ 5‏:27‏-32',
    'ܡܬܝ 9‏:14‏-17',
    'ܠܘܩܐ 5‏:33‏-39',
    'ܡܬܝ 12‏:1‏-8',
    'ܠܘܩܐ 6‏:1‏-5',

    # Mark 3
    'ܡܬܝ 12‏:9‏-14',
    'ܠܘܩܐ 6‏:6‏-11',
    'ܡܬܝ 10‏:1‏-4',
    'ܠܘܩܐ 6‏:12‏-16',
    'ܡܬܝ 12‏:22‏-32',
    'ܠܘܩܐ 11‏:14‏-23',
    'ܡܬܝ 12‏:46‏-50',
    'ܠܘܩܐ 8‏:19‏-21',

    # Mark 4
    'ܡܬܝ 13‏:1‏-9',
    'ܠܘܩܐ 8‏:4‏-8',
    'ܡܬܝ 13‏:10‏-17',
    'ܠܘܩܐ 8‏:9‏-10',
    'ܡܬܝ 13‏:18‏-23',
    'ܠܘܩܐ 8‏:11‏-15',
    'ܠܘܩܐ 8‏:16‏-18',
    'ܡܬܝ 13‏:31‏-32',
    'ܠܘܩܐ 13‏:18‏-19',
    'ܡܬܝ 8‏:23‏-27',
    'ܠܘܩܐ 8‏:22‏-25',

    # Mark 5
    'ܡܬܝ 8‏:28‏-34',
    'ܠܘܩܐ 8‏:26‏-39',
    'ܡܬܝ 9‏:18‏-26',
    'ܠܘܩܐ 8‏:40‏-56',

    # Mark 6
    'ܡܬܝ 13‏:53‏-58',
    'ܠܘܩܐ 4‏:16‏-30',
    'ܡܬܝ 10‏:1',
    'ܠܘܩܐ 9‏:1‏-6',
    'ܡܬܝ 14‏:1‏-12',
    'ܠܘܩܐ 9‏:7‏-9',
    'ܡܬܝ 14‏:13‏-21',
    'ܠܘܩܐ 9‏:10‏-17',
    'ܝܘܚܢܢ 6‏:1‏-14',
    'ܡܬܝ 14‏:22‏-33',
    'ܝܘܚܢܢ 6‏:15‏-21',
    'ܡܬܝ 14‏:34‏-36',

    # Mark 7
    'ܡܬܝ 15‏:1‏-20',
    'ܡܬܝ 15‏:21‏-28',

    # Mark 8
    'ܡܬܝ 15‏:32‏-39',
    'ܡܬܝ 16‏:1‏-4',
    'ܡܬܝ 16‏:5‏-12',
    'ܡܬܝ 16‏:13‏-20',
    'ܠܘܩܐ 9‏:18‏-21',
    'ܡܬܝ 16‏:21‏-28',
    'ܠܘܩܐ 9‏:22‏-27',
    'ܡܬܝ 16‏:24‏-27',
    'ܠܘܩܐ 9‏:23‏-26',

    # Mark 9
    'ܡܬܝ 17‏:1‏-13',
    'ܠܘܩܐ 9‏:28‏-36',
    'ܡܬܝ 17‏:14‏-20',
    'ܠܘܩܐ 9‏:37‏-43',
    'ܡܬܝ 17‏:22‏-23',
    'ܠܘܩܐ 9‏:43‏-45',
    'ܡܬܝ 18‏:1‏-5',
    'ܠܘܩܐ 9‏:46‏-48',
    'ܠܘܩܐ 9‏:49‏-50',
    'ܡܬܝ 18‏:6‏-9',
    'ܠܘܩܐ 17‏:1‏-2',

    # Mark 10
    'ܡܬܝ 19‏:1‏-12',
    'ܡܬܝ 19‏:13‏-15',
    'ܠܘܩܐ 18‏:15‏-17',
    'ܡܬܝ 19‏:16‏-30',
    'ܠܘܩܐ 18‏:18‏-30',
    'ܡܬܝ 20‏:17‏-19',
    'ܠܘܩܐ 18‏:31‏-34',
    'ܡܬܝ 20‏:20‏-28',
    'ܡܬܝ 20‏:29‏-34',
    'ܠܘܩܐ 18‏:35‏-43',

    # Mark 11
    'ܡܬܝ 21‏:1‏-11',
    'ܠܘܩܐ 19‏:28‏-40',
    'ܝܘܚܢܢ 12‏:12‏-19',
    'ܡܬܝ 21‏:18‏-19',
    'ܡܬܝ 21‏:12‏-17',
    'ܠܘܩܐ 19‏:45‏-48',
    'ܝܘܚܢܢ 2‏:13‏-22',
    'ܡܬܝ 21‏:20‏-22',
    'ܡܬܝ 21‏:23‏-27',
    'ܠܘܩܐ 20‏:1‏-8',

    # Mark 12
    'ܡܬܝ 21‏:33‏-46',
    'ܠܘܩܐ 20‏:9‏-19',
    'ܡܬܝ 22‏:15‏-22',
    'ܠܘܩܐ 20‏:20‏-26',
    'ܡܬܝ 22‏:23‏-33',
    'ܠܘܩܐ 20‏:27‏-40',
    'ܡܬܝ 22‏:34‏-40',
    'ܠܘܩܐ 10‏:25‏-28',
    'ܡܬܝ 22‏:41‏-46',
    'ܠܘܩܐ 20‏:41‏-44',
    'ܡܬܝ 23‏:1‏-36',
    'ܠܘܩܐ 20‏:45‏-47',
    'ܠܘܩܐ 21‏:1‏-4',

    # Mark 13
    'ܡܬܝ 24‏:1‏-2',
    'ܠܘܩܐ 21‏:5‏-6',
    'ܡܬܝ 24‏:3‏-14',
    'ܠܘܩܐ 21‏:7‏-19',
    'ܡܬܝ 24‏:15‏-28',
    'ܠܘܩܐ 21‏:20‏-24',
    'ܡܬܝ 24‏:29‏-31',
    'ܠܘܩܐ 21‏:25‏-28',
    'ܡܬܝ 24‏:32‏-35',
    'ܠܘܩܐ 21‏:29‏-33',
    'ܡܬܝ 24‏:36‏-44',
    'ܠܘܩܐ 17‏:26‏-36',

    # Mark 14
    'ܡܬܝ 26‏:1‏-5',
    'ܠܘܩܐ 22‏:1‏-2',
    'ܝܘܚܢܢ 11‏:45‏-53',
    'ܡܬܝ 26‏:6‏-13',
    'ܝܘܚܢܢ 12‏:1‏-8',
    'ܡܬܝ 26‏:14‏-16',
    'ܠܘܩܐ 22‏:3‏-6',
    'ܡܬܝ 26‏:17‏-25',
    'ܝܘܚܢܢ 13‏:21‏-30',
    'ܡܬܝ 26‏:26‏-30',
    'ܠܘܩܐ 22‏:15‏-20',
    'ܐ ܩܘܪ̈ܢܬܝܐ 11‏:23‏-25',
    'ܡܬܝ 26‏:31‏-35',
    'ܠܘܩܐ 22‏:31‏-34',
    'ܝܘܚܢܢ 13‏:36‏-38',
    'ܡܬܝ 26‏:36‏-46',
    'ܠܘܩܐ 22‏:39‏-46',
    'ܡܬܝ 26‏:47‏-56',
    'ܠܘܩܐ 22‏:47‏-53',
    'ܝܘܚܢܢ 18‏:3‏-12',
    'ܡܬܝ 26‏:57‏-68',
    'ܠܘܩܐ 22‏:54‏-55',
    'ܝܘܚܢܢ 18‏:13‏-14',
    'ܡܬܝ 26‏:69‏-75',
    'ܠܘܩܐ 22‏:56‏-62',
    'ܝܘܚܢܢ 18‏:15‏-18',

    # Mark 15
    'ܡܬܝ 27‏:1‏-2',
    'ܠܘܩܐ 23‏:1‏-5',
    'ܝܘܚܢܢ 18‏:28‏-38',
    'ܡܬܝ 27‏:15‏-26',
    'ܠܘܩܐ 23‏:13‏-25',
    'ܝܘܚܢܢ 18‏:39',
    'ܡܬܝ 27‏:27‏-31',
    'ܝܘܚܢܢ 19‏:2‏-3',
    'ܡܬܝ 27‏:32‏-44',
    'ܠܘܩܐ 23‏:26‏-43',
    'ܝܘܚܢܢ 19‏:17‏-27',
    'ܡܬܝ 27‏:45‏-56',
    'ܠܘܩܐ 23‏:44‏-49',
    'ܝܘܚܢܢ 19‏:28‏-30',
    'ܡܬܝ 27‏:57‏-61',
    'ܠܘܩܐ 23‏:50‏-56',
    'ܝܘܚܢܢ 19‏:38‏-42',

    # Mark 16
    'ܡܬܝ 28‏:1‏-8',
    'ܠܘܩܐ 24‏:1‏-12',
    'ܝܘܚܢܢ 20‏:1‏-10',
    'ܡܬܝ 28‏:9‏-10',
    'ܝܘܚܢܢ 20‏:11‏-18',
    'ܠܘܩܐ 24‏:13‏-35',
    'ܡܬܝ 28‏:16‏-20',
    'ܠܘܩܐ 24‏:36‏-49',
    'ܝܘܚܢܢ 20‏:19‏-23',
    'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ 1‏:6‏-8',
    'ܠܘܩܐ 24‏:50‏-53',
    'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ 1‏:9‏-11',

    # Luke 2
    'ܡܬܝ 1‏:18‏-25',

    # Luke 3
    'ܡܪܩܘܣ 1‏:1‏-8',
    'ܡܪܩܘܣ 1‏:9‏-11',
    'ܡܬܝ 1‏:1‏-17',

    # Luke 4
    'ܡܪܩܘܣ 1‏:12‏-13',
    'ܡܪܩܘܣ 1‏:14‏-15',
    'ܡܪܩܘܣ 6‏:1‏-6',
    'ܡܪܩܘܣ 1‏:21‏-28',
    'ܡܪܩܘܣ 1‏:29‏-34',
    'ܡܪܩܘܣ 1‏:35‏-39',

    # Luke 5
    'ܡܪܩܘܣ 1‏:16‏-20',
    'ܡܪܩܘܣ 1‏:40‏-45',
    'ܡܪܩܘܣ 2‏:1‏-12',
    'ܡܪܩܘܣ 2‏:13‏-17',
    'ܡܪܩܘܣ 2‏:18‏-22',

    # Luke 6
    'ܡܪܩܘܣ 2‏:23‏-28',
    'ܡܪܩܘܣ 3‏:1‏-6',
    'ܡܪܩܘܣ 3‏:13‏-19',
    'ܡܬܝ 4‏:23‏-25',
    'ܡܬܝ 5‏:1‏-12',
    'ܡܬܝ 5‏:38‏-48',
    'ܡܬܝ 7‏:1‏-5',
    'ܡܬܝ 7‏:17‏-20',
    'ܡܬܝ 7‏:24‏-27',

    # Luke 7
    'ܡܬܝ 8‏:5‏-13',
    'ܝܘܚܢܢ 4‏:43‏-54',
    'ܡܬܝ 11‏:2‏-19',

    # Luke 8
    'ܡܪܩܘܣ 4‏:1‏-9',
    'ܡܪܩܘܣ 4‏:10‏-12',
    'ܡܪܩܘܣ 4‏:13‏-20',
    'ܡܪܩܘܣ 4‏:21‏-25',
    'ܡܪܩܘܣ 3‏:31‏-35',
    'ܡܪܩܘܣ 4‏:35‏-41',
    'ܡܪܩܘܣ 5‏:1‏-20',
    'ܡܪܩܘܣ 5‏:21‏-43',

    # Luke 9
    'ܡܬܝ 10‏:5‏-15',
    'ܡܪܩܘܣ 6‏:7‏-13',
    'ܡܪܩܘܣ 6‏:14‏-29',
    'ܡܪܩܘܣ 6‏:30‏-44',
    'ܡܬܝ 16‏:13‏-19',
    'ܡܪܩܘܣ 8‏:27‏-29',
    'ܡܪܩܘܣ 8‏:30',
    'ܡܪܩܘܣ 8‏:34‏-38',
    'ܡܬܝ 17‏:1‏-8',
    'ܡܪܩܘܣ 9‏:2‏-8',
    'ܡܬܝ 17‏:14‏-18',
    'ܡܪܩܘܣ 9‏:14‏-27',
    'ܡܪܩܘܣ 9‏:30‏-32',
    'ܡܪܩܘܣ 9‏:33‏-37',
    'ܡܪܩܘܣ 9‏:38‏-40',
    'ܡܬܝ 8‏:19‏-22',

    # Luke 10
    'ܡܬܝ 11‏:20‏-24',
    'ܡܬܝ 11‏:25‏-27',

    # Luke 11
    'ܡܬܝ 6‏:9‏-15',
    'ܡܬܝ 7‏:7‏-12',
    'ܡܬܝ 12‏:22‏-30',
    'ܡܪܩܘܣ 3‏:20‏-27',
    'ܡܬܝ 12‏:43‏-45',
    'ܡܬܝ 12‏:38‏-42',
    'ܡܪܩܘܣ 8‏:12',
    'ܡܬܝ 5‏:15',
    'ܡܪܩܘܣ 12‏:38‏-40',

    # Luke 12
    'ܡܬܝ 10‏:28‏-31',
    'ܡܬܝ 10‏:32‏-33',
    'ܡܬܝ 6‏:25‏-34',
    'ܡܬܝ 24‏:45‏-51',
    'ܡܬܝ 10‏:34‏-36',
    'ܡܬܝ 16‏:2‏-3',
    'ܡܬܝ 5‏:25‏-26',

    # Luke 13
    'ܡܬܝ 13‏:31‏-33',
    'ܡܪܩܘܣ 4‏:30‏-32',
    'ܡܬܝ 7‏:13‏-14',
    'ܡܬܝ 23‏:37‏-39',

    # Luke 14
    'ܡܬܝ 22‏:1‏-10',
    'ܡܬܝ 10‏:37‏-38',
    'ܡܬܝ 5‏:13',
    'ܡܪܩܘܣ 9‏:50',

    # Luke 15
    'ܡܬܝ 18‏:12‏-14',

    # Luke 16
    'ܡܬܝ 11‏:12‏-13',

    # Luke 17
    'ܡܬܝ 18‏:6‏-7',
    'ܡܪܩܘܣ 9‏:42',
    'ܡܬܝ 24‏:23‏-28',

    # Luke 18
    'ܡܪܩܘܣ 10‏:13‏-16',
    'ܡܪܩܘܣ 10‏:17‏-31',
    'ܡܪܩܘܣ 10‏:32‏-34',
    'ܡܪܩܘܣ 10‏:46‏-52',

    # Luke 19
    'ܡܬܝ 25‏:14‏-30',
    'ܡܪܩܘܣ 11‏:1‏-11',
    'ܡܪܩܘܣ 11‏:15‏-19',

    # Luke 20
    'ܡܪܩܘܣ 11‏:27‏-33',
    'ܡܪܩܘܣ 12‏:1‏-12',
    'ܡܪܩܘܣ 12‏:13‏-17',
    'ܡܪܩܘܣ 12‏:18‏-27',
    'ܡܪܩܘܣ 12‏:35‏-37',
    'ܠܘܩܐ 11‏:37‏-54',

    # Luke 21
    'ܡܪܩܘܣ 12‏:41‏-44',
    'ܡܪܩܘܣ 13‏:1‏-2',
    'ܡܪܩܘܣ 13‏:3‏-13',
    'ܡܬܝ 24‏:15‏-21',
    'ܡܪܩܘܣ 13‏:14‏-19',
    'ܡܪܩܘܣ 13‏:24‏-27',
    'ܡܪܩܘܣ 13‏:28‏-31',

    # Luke 22
    'ܡܪܩܘܣ 14‏:12‏-21',
    'ܡܪܩܘܣ 14‏:22‏-26',
    'ܡܪܩܘܣ 14‏:27‏-31',
    'ܡܪܩܘܣ 14‏:32‏-42',
    'ܡܪܩܘܣ 14‏:43‏-50',
    'ܝܘܚܢܢ 18‏:3‏-11',
    'ܡܬܝ 26‏:57‏-58',
    'ܡܪܩܘܣ 14‏:53‏-54',
    'ܝܘܚܢܢ 18‏:12‏-18',
    'ܡܬܝ 26‏:67‏-68',
    'ܡܪܩܘܣ 14‏:65',
    'ܡܬܝ 26‏:59‏-66',
    'ܡܪܩܘܣ 14‏:55‏-64',
    'ܝܘܚܢܢ 18‏:19‏-24',

    # Luke 23
    'ܡܪܩܘܣ 15‏:1‏-5',
    'ܡܪܩܘܣ 15‏:6‏-15',
    'ܡܪܩܘܣ 15‏:21‏-32',
    'ܡܪܩܘܣ 15‏:33‏-41',
    'ܡܪܩܘܣ 15‏:42‏-47',

    # Luke 24
    'ܡܬܝ 28‏:1‏-10',
    'ܡܪܩܘܣ 16‏:1‏-8',
    'ܡܪܩܘܣ 16‏:12‏-13',
    'ܡܪܩܘܣ 16‏:14‏-18',
    'ܡܪܩܘܣ 16‏:19‏-20',

    # Matthew 1
    'ܠܘܩܐ 3‏:22‏-38',
    'ܠܘܩܐ 2‏:1‏-7',

    # Matthew 4
    'ܠܘܩܐ 6‏:17‏-19',

    # Matthew 5
    'ܠܘܩܐ 6‏:20‏-23',
    'ܠܘܩܐ 14‏:34‏-35',
    'ܡܬܝ 19‏:9',
    'ܡܪܩܘܣ 10‏:11‏-12',
    'ܠܘܩܐ 16‏:18',
    'ܠܘܩܐ 6‏:29‏-30',
    'ܠܘܩܐ 6‏:27‏-28',

    # Matthew 6
    'ܠܘܩܐ 11‏:2‏-4',
    'ܠܘܩܐ 12‏:33‏-34',
    'ܠܘܩܐ 11‏:34‏-36',
    'ܠܘܩܐ 12‏:22‏-34',

    # Matthew 7
    'ܠܘܩܐ 6‏:37‏-38',
    'ܠܘܩܐ 11‏:9‏-13',
    'ܠܘܩܐ 13‏:24',
    'ܠܘܩܐ 6‏:43‏-44',
    'ܠܘܩܐ 13‏:25‏-27',
    'ܠܘܩܐ 6‏:47‏-49',

    # Matthew 8
    'ܠܘܩܐ 7‏:1‏-10',
    'ܠܘܩܐ 9‏:57‏-62',

    # Matthew 10
    'ܡܪܩܘܣ 13‏:9‏-13',
    'ܠܘܩܐ 21‏:12‏-17',
    'ܠܘܩܐ 12‏:2‏-7',
    'ܠܘܩܐ 12‏:8‏-9',
    'ܠܘܩܐ 12‏:51‏-53',
    'ܡܪܩܘܣ 9‏:41',

    # Matthew 11
    'ܠܘܩܐ 7‏:18‏-35',
    'ܠܘܩܐ 10‏:13‏-15',
    'ܠܘܩܐ 10‏:21‏-22',

    # Matthew 12
    'ܡܪܩܘܣ 3‏:20‏-30',
    'ܠܘܩܐ 6‏:43‏-45',
    'ܡܪܩܘܣ 8‏:11‏-12',
    'ܠܘܩܐ 11‏:29‏-32',
    'ܠܘܩܐ 11‏:24‏-26',

    # Matthew 13
    'ܠܘܩܐ 13‏:18‏-21',

    # Matthew 14
    'ܡܪܩܘܣ 6‏:45‏-52',
    'ܡܪܩܘܣ 6‏:53‏-56',

    # Matthew 15
    'ܡܪܩܘܣ 7‏:1‏-23',
    'ܡܪܩܘܣ 7‏:24‏-30',
    'ܡܪܩܘܣ 8‏:1‏-10',

    # Matthew 16
    'ܡܪܩܘܣ 8‏:11‏-13',
    'ܠܘܩܐ 12‏:54‏-56',
    'ܡܪܩܘܣ 8‏:14‏-21',
    'ܡܪܩܘܣ 8‏:27‏-30',
    'ܡܪܩܘܣ 8‏:31',

    # Matthew 17
    'ܡܪܩܘܣ 9‏:2‏-13',
    'ܡܪܩܘܣ 9‏:14‏-29',

    # Matthew 18
    'ܡܪܩܘܣ 9‏:42‏-48',
    'ܠܘܩܐ 15‏:3‏-7',
    'ܠܘܩܐ 17‏:3',

    # Matthew 19
    'ܡܪܩܘܣ 10‏:1‏-12',

    # Matthew 20
    'ܡܪܩܘܣ 10‏:35‏-45',

    # Matthew 21
    'ܠܘܩܐ 19‏:28‏-38',
    'ܡܪܩܘܣ 11‏:12‏-14',

    # Matthew 22
    'ܠܘܩܐ 14‏:15‏-24',
    'ܡܪܩܘܣ 12‏:28‏-34',

    # Matthew 23
    'ܠܘܩܐ 11‏:37‏-52',
    'ܠܘܩܐ 13‏:34‏-35',

    # Matthew 24
    'ܡܪܩܘܣ 13‏:14‏-23',
    'ܡܪܩܘܣ 13‏:32‏-37',
    'ܠܘܩܐ 17‏:26‏-30',
    'ܠܘܩܐ 12‏:41‏-48',

    # Matthew 25
    'ܠܘܩܐ 19‏:11‏-27',

    # Matthew 26
    'ܡܪܩܘܣ 14‏:1‏-2',
    'ܡܪܩܘܣ 14‏:3‏-9',
    'ܡܪܩܘܣ 14‏:10‏-11',
    'ܠܘܩܐ 22‏:7‏-14',
    'ܡܪܩܘܣ 14‏:53‏-65',
    'ܡܪܩܘܣ 14‏:66‏-72',
    'ܠܘܩܐ 22‏:54‏-62',

    # Matthew 27
    'ܡܪܩܘܣ 15‏:1',
    'ܠܘܩܐ 23‏:1‏-2',
    'ܝܘܚܢܢ 18‏:28‏-32',
    'ܣܘܥܪ̈ܢܐ ܕܫܠܝܚ̈ܐ 1‏:18‏-19',
    'ܡܪܩܘܣ 15‏:2‏-5',
    'ܠܘܩܐ 23‏:3‏-5',
    'ܝܘܚܢܢ 18‏:33‏-38',
    'ܡܪܩܘܣ 15‏:16‏-20',

    # John 1
    'ܡܪܩܘܣ 1‏:2‏-8',
    'ܠܘܩܐ 3‏:15‏-17',

    # John 2
    'ܡܬܝ 21‏:22‏-33',
    'ܡܪܩܘܣ 11‏:15‏-17',
    'ܠܘܩܐ 19‏:45‏-46',

    # John 6
    'ܡܬܝ 14‏:22‏-27',

    # John 13
    'ܡܬܝ 26‏:20‏-25',
    'ܡܪܩܘܣ 14‏:17‏-21',
    'ܠܘܩܐ 22‏:21‏-23',

    # John 18
    'ܠܘܩܐ 22‏:54',
    'ܡܬܝ 26‏:69‏-70',
    'ܡܪܩܘܣ 14‏:66‏-68',
    'ܠܘܩܐ 22‏:55‏-57',
    'ܠܘܩܐ 22‏:66‏-71',
    'ܡܬܝ 26‏:71‏-75',
    'ܡܪܩܘܣ 14‏:69‏-72',
    'ܠܘܩܐ 22‏:58‏-62',
    'ܡܬܝ 27‏:11‏-18',
    'ܡܪܩܘܣ 15‏:2‏-15',
    'ܠܘܩܐ 23‏:2‏-3',

    # John 19
    'ܡܬܝ 27‏:15‏-31',

    # John 20
    # won't replace this since there's a dangling diacritic
    # 'ܡܪܩܘܣ1‏̣:8‏-16',
    'ܡܪܩܘܣ 16‏:9‏-11',

]

# we sort in reverse so replacements of ranges of verses occur before single verse
# when book, chapter and start verse is same, ex.
# ܡܬܝ 10‏:1‏-4
# ܡܬܝ 10‏:1‏
ref_replacements.sort(reverse=True)

if len(ref_replacements) != len(set(ref_replacements)):
    raise Exception("duplicates in list")

class TestSpider(scrapy.Spider):
    name = "bible"

    custom_settings = {
        'HTTPCACHE_ENABLED': True,
        'HTTPCACHE_EXPIRATION_SECS': 0, # default is 0
    }

    books_chapters = [
        ('PSA', 150),
        ('MAT', 28),
        ('MRK', 16),
        ('LUK', 24),
        ('JHN', 21),
        ('ACT', 28),
        ('ROM', 16),
        ('1CO', 16),
        ('2CO', 13),
        ('GAL', 6),
        ('EPH', 6),
        ('PHP', 4),
        ('COL', 4),
        ('1TH', 5),
        ('2TH', 3),
        ('1TI', 6),
        ('2TI', 4),
        ('TIT', 3),
        ('PHM', 1),
        ('HEB', 13),
        ('JAS', 5),
        ('1PE', 5),
        ('2PE', 3),
        ('1JN', 5),
        ('2JN', 1),
        ('3JN', 1),
        ('JUD', 1),
        ('REV', 22),
    ]

    translations = {
        'AII': 1080,
        # 'NCV': 105,
        'NLT': 116,
    }

    start_urls = []
    for book_chapters in books_chapters:
        (book, chapters) = book_chapters
        for chapter in range(1, chapters+1):
            for translation, code in translations.items():
                chapter_of_translation = f"{book}.{chapter}.{translation}"
                start_url = f"https://www.bible.com/bible/{code}/{chapter_of_translation}"
                start_urls.append(start_url)

    # print(start_urls)

    # https://stackoverflow.com/a/38234394
    def parse(self, response):
        chapter = response.url.split("/")[-1] # ex. REV.22.AII
        filename = 'bible_chapters/' + chapter + '.html'
        with open(filename, 'wb') as file:
            file.write(response.body)

        verse_num = 1
        consec_header = 1
        consec_ref = 1
        chapter_name,chapter_number,translation = chapter.split('.')
        children = response.css(f'div[data-usfm="{chapter_name}.{chapter_number}"] > div')
        for child in children:
            heading = (child.css('.s1 .heading::text').get() or
                child.css('.ms .heading::text').get() or
                child.css('.qa .heading::text').get())
            reference = (child.css('.r .heading::text').get() or
                child.css('.mr .heading::text').get())
            if heading is not None and translation == 'AII':
                yield {
                    'meta': f"{chapter}:{verse_num}:header:{consec_header}",
                    'body': heading \
                        .replace("‌ܐ", 'ܐ') \
                        .replace("ܗ‌ܝ", 'ܗܝ') \
                        .replace("ܬ‌ܝ", 'ܬܝ')
                }
                consec_header += 1

            if reference is not None and translation == 'AII':
                reference = reference.replace("ܬ‌ܝ", 'ܬܝ')
                prev_replacements = []
                for ref_replacement in ref_replacements:
                    # we know replacements are sorted in descending order of length, so we check if
                    # proposed replacement is a substring of a previous replacement to avoid another
                    # replacement for the same substring (ie avoid nested <a> tags)
                    if ref_replacement in reference:
                        if any(ref_replacement in prev_replacement for prev_replacement in prev_replacements):
                            continue
                        prev_replacements.append(ref_replacement)
                        book, chap, start, end = str_ref_to_list(ref_replacement)
                        doc, tag, text = Doc().tagtext()
                        with tag('a', klass = 'bible-backlink', href=f'?book={book}&chapter={chap}:{start}-{end}'):
                            text(ref_replacement)
                        reference = reference.replace(ref_replacement, doc.getvalue())
                yield {
                    'meta': f"{chapter}:{verse_num}:referenceHTML:{consec_ref}",
                    'body': reference
                }
                consec_ref += 1
            else:
                while True:
                    verse_key = f"{chapter}:{verse_num}"
                    verse = child.css(f".v{verse_num} .content::text").get()
                    next_verse = child.css(f".v{verse_num+1} .content::text").get()
                    verse_data = parse_verse(verse_key, verse_num, verse, next_verse, response)

                    if verse_data is not None:
                        yield verse_data
                        verse_num += 1
                        consec_header = 1
                        consec_ref = 1
                    else:
                        break


def parse_verse(verse_key, verse_num, verse, next_verse, response):
    if verse_key in nlt_edge_cases:
        return {
            'meta': verse_key,
            'body': nlt_edge_cases[verse_key],
        }

    if verse is not None:
        # there could be multiple elements with .v1 outside of current child so we
        # getall and then join later
        verse_fragments = response.css(f".v{verse_num} .content::text").getall()
        # 0x200c zero-width non joiner

        # bible corrections following zero width non joiner were determined by counting word occurrences
        # from a wiktionary dump: https://kaikki.org/dictionary/Assyrian%20Neo-Aramaic/index.html
        # and grepping for a talqana, then comparing those word forms with the talqana removed
        # to the common words in the bible
        sentence = " ".join(verse_fragments).strip() \
            .replace('Lord ,', 'Lord,') \
            .replace("‌ܐ", 'ܐ') \
            .replace("ܗ‌ܝ", 'ܗܝ') \
            .replace("ܬ‌ܝ", 'ܬܝ') \
            .replace('ܬܲ‌ܝ', 'ܬܲܝ') \
            .replace('ܗܘܵܐ', 'ܗ݇ܘܵܐ') \
            .replace('ܗܘܹܐ', 'ܗ݇ܘܹܐ') \
            .replace('ܗܘܵܘ', 'ܗ݇ܘܵܘ') \
            .replace('ܗܘܝܼ', 'ܗ݇ܘܝܼ') \
            .replace('ܗܘܹܝܡܘܼܢ', 'ܗ݇ܘܹܝܡܘܼܢ') \
            .replace('ܗܘܵܝܵܐ', 'ܗ݇ܘܵܝܵܐ') \
            .replace('ܝܗܘܵܐ', 'ܝܗ݇ܘܵܐ') \
            .replace('ܝܼܵܗܒ݂ܵܐ', 'ܝܼܵܗ݇ܒ݂ܵܐ') \
            .replace('ܝܵܗܒ', 'ܝܵܗ݇ܒ') \
            .replace('ܝܘܼܗܒ', 'ܝܘܼܗ݇ܒ') \
            .replace('ܗܲܒ݂ܠ', 'ܗܲܒ݂݇ܠ') \
            .replace('ܩܲܕܡ', 'ܩܲܕ݇ܡ') \
            .replace('ܒܵܬܪ', 'ܒܵܬ݇ܪ') \
            .replace('ܚܹܪ̈ܢܹ', 'ܚܹܪ̈݇ܢܹ') \
            .replace('ܚܹܪܬܵ', 'ܚܹܪ݇ܬܵ') \
            .replace('ܐܚܹܪܢܵܐ', 'ܐ݇ܚܹܪ݇ܢܵܐ') \
            .replace('ܚܲܝܘܬܵܐ', 'ܚܲܝ݇ܘܬܵܐ') \
            .replace('ܪܗܘܿܡܵ', 'ܪܗ݇ܘܿܡܵ') \
            .replace('ܪ̈ܗܘܿܡܵ', 'ܪ̈ܗ݇ܘܿܡܵ') \
            .replace('ܒܸܪܚܵܫܵܐ', 'ܒܸܪ݇ܚܵܫܵܐ') \
            .replace('ܪܗܘܿܡܹ', 'ܪܗ݇ܘܿܡܹ')

            # .replace('', '')
            # .replace('', '')


        # this is ugly but we we'll fix later
        sentence = sentence.replace('ܚܲܕܘܼ', '1111111111') \
            .replace('ܚܲܕܸ', '2222222222') \
            .replace('ܚܲܕܲܬܬܵܐ', '3333333333') \
            .replace('ܡܲܫܚܲܕܬܵܐ', '4444444444') \
            .replace('ܚܲܕ݇ܒܫܵܒܵܐ', '5555555555')
        sentence = sentence.replace('ܚܲܕ', 'ܚܲܕ݇')
        sentence = sentence.replace('1111111111', 'ܚܲܕܘܼ') \
            .replace('2222222222', 'ܚܲܕܸ') \
            .replace('3333333333', 'ܚܲܕܲܬܬܵܐ') \
            .replace('4444444444', 'ܡܲܫܚܲܕܬܵܐ') \
            .replace('5555555555', 'ܚܲܕ݇ܒܫܵܒܵܐ')




        # replacements = {
        #     'ܚܲܕ': 'ܚܲܕ݇',
        #     'ܚܲܕܟܡܵܐ': 'ܚܲܕ݇ܟܡܵܐ',
        #     'ܚܲܕܟ̰ܵܐ': 'ܚܲܕ݇ܟ̰ܵܐ',
        #     'ܚܲܕܬܵܐ': 'ܚܲܕ݇ܬܵܐ',
        # }
        # for initial, replacement in replacements.items():
        #     sentence =re.sub(rf"{initial}($|\s)", f'{replacement}\\1', sentence)


        sentence_single_space = re.sub(' +', ' ', sentence)

        return {
            'meta': verse_key,
            # we're normalizing since the data will be indexed/searched via fuse.js
            'body': unicodedata.normalize('NFC', sentence_single_space),
            # 'body': sentence_single_space,
        }

    if next_verse is not None:
        return {
            'meta': verse_key,
            'body': None,
        }

    return None

if __name__ == "__main__":
    print(TestSpider.books_chapters)
