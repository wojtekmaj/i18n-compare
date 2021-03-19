[![CI](https://github.com/wojtekmaj/i18n-compare/workflows/CI/badge.svg)](https://github.com/wojtekmaj/i18n-compare/actions)

# i18n-compare

Generates a summary of differences between two i18n files.

## Sample input & output

### Input A

```json
{
  "Hello": "Cześć",
  "world": "świecie",
  "I’m missing": "Nie ma mnie",
  "I’m also missing": "Mnie też nie ma"
}
```

### Input B

```
{
  "Hello": "Hallo",
  "world": "Welt",
  "I’m extra": "Ich bin ein Extra"
}
```

### Output

```
## ✨ Missing keys
* "`I’m missing`"
* "`I’m also missing`"

## 🗑️ Extra keys
* "`I’m extra`"
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="https://wojtekmaj.pl">https://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
