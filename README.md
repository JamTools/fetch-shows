# Fetch Shows

A script to fetch a list of soundboard quality shows from archive.org

The purpose of this script is help you compile a list of shows available on archive.org into one file. The list can be used to download the shows (using our scripts) and/or listen them to by visiting the site.

## Installation
In order to use this program you will need to be running a Unix OS and have NodeJS and Node Package Manager (NPM) installed. This was developed using Node version 8, but anything above version 6 should suffice.

```
# install curl dependency so you can download the latest version of Node 8 and NPM
sudo apt-get install -y curl
```

```
# make the curl request to get the latest version of Node 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

```
# install Node 8
sudo apt-get install -y nodejs
```

You can confirm your version of Node by typing:
```
node -v
# v8.9.4
```

You can do the same for NPM by typing:
```
npm -v
# v5.6.0
```

## Usage

This script comes with a handful of useful commands to help with querying and storing your search results.

### Options

| Flag | Description | Default |
| ---- | ---- | ---- |
| `-c` or `--creator` | The name of the archive creator you are wanting to search for | null |
| `-f` or `--file` | The name of the file you want the results saved to | results.txt |
| `-p` or `--path` | The directory that you want to save the files to | /home/*username*/Downloads |
| `-o` or `--overwrite` | This will overwrite the generated file. Without this flag, results will be appended | false |
| `-e` or `--enddate` | The ending date for your search range, ex: 2000-03-11 | * |
| `-s` or `--startdate` | The start date for your search range, ex: 2000-03-09 | * |
| `-h` or `--help` | output usage information | &nbsp; |


### Required Flag

#### Creator

You **must** pass a creator to the script using the `-c` or `--creator` flag. This generally the band you are searching for.
```
node fetch-shows -c "creator name"
node fetch-shows --creator "creator name"
```

If you are having trouble getting results, do a Google search for your desired band and the word `archive.org`. For example:

```
grateful dead archive.org
```

### Optional Flags

Below are optional flags you can use to customize your search or where the results of your search are stored.

#### File

Use the file (`-f` or `--file`) flag to specify the name of the file you want saved.
```
node fetch-shows -c "creator name" -f "my-file.txt"
node fetch-shows --creator "creator name" --file "my-file.txt"
```

#### Path

Use the path (`-p` or `--path`) flag to specify the directory where you want the file saved. **Note: The directory must exist.**
```
node fetch-shows -c "creator name" -p "/home/*username*/Jams"
node fetch-shows --creator "creator name" --path "/home/*username*/Jams"
```

#### Overwrite

Use the overwrite (`-o` or `--overwrite`) flag to specify that you want to overwrite the contents in the results file. By default, without this flag it will append an already existing file and create a new one if none exists.
```
node fetch-shows -c "creator name" -o # overwrites the results in the file, creates it if it does not exist
node fetch-shows --creator "creator name" --overwrite # overwrites the results in the file, creates it if it does not exist
node fetch-shows --creator "creator name" # without a flag it will append or create the file if it does not exist
```

#### Start Date

Use the start date (`-s` or `--startdate`) flag to specify a minimum date that all shows in your query should have occurred. This will grab all shows that have occurred on or after the specified date.
```
node fetch-shows -c "creator name" -s "2000-03-09"
node fetch-shows --creator "creator name" --startdate "2000-03-09"
```

#### End Date

Use the end date (`-e` or `--enddate`) flag to specify a maximum date that all shows in your query should have occurred. This will grab all shows that have occurred on or before the specified date.
```
node fetch-shows -c "creator name" -e "2000-03-11"
node fetch-shows --creator "creator name" --enddate "2000-03-11"
```

#### Combining Date

Here is a quick example of using the start date and end date flags together:
```
node fetch-shows -c "creator name" -s "2000-03-09" -e "2000-03-11"
```