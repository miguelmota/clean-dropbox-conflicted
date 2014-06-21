# Clean Dropbox Conflicted

Recursively renames conflicted [Dropbox](https://www.dropbox.com/) files to it's original file name and replaces old files if already exists.

# Install

```bash
npm install clean-dropbox-conflicted -g
```

# Usage

```bash
clean-dropbox-conflicted <directory>
```

# Example

```bash
$ git clone https://github.com/miguelmota/clean-dropbox-conflicted.git
$ cd clean-dropbox-conflicted/
$ tree example/

example/
├── foo\ (Miguel\ Mota's\ conflicted\ copy\ 2014-06-17).txt
├── foo.txt
└── sub
    ├── bar\ (Miguel\ Mota's\ conflicted\ copy\ 2014-06-17).txt
        └── bar.txt

        1 directory, 4 files
```

```bash
$ clean-dropbox-conflicted example/

/example/foo (Miguel Mota's conflicted copy 2014-06-17).txt => /example/foo.txt
/example/sub/bar (Miguel Mota's conflicted copy 2014-06-17).txt => /example/sub/bar.txt
```

```bash
$ tree example/

example/
├── foo.txt
└── sub
    └── bar.txt

    1 directory, 2 files
```

# Test

```bash
nodeunit test/
```

# License

Released under the MIT License.
