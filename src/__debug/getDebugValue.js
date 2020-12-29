function* getDebugValue() {
  while (true) {
    yield `{
  "Hello": "Cześć",
  "world": "świecie",
  "I’m missing": "Nie ma mnie",
  "I’m also missing": "Mnie też nie ma"
}`;

    yield `{
  "Hello": "Hallo",
  "world": "Welt",
  "I’m extra": "Ich bin ein Extra"
}`;
  }
}

export default getDebugValue();
