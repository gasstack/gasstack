function test() {}

export function test_home(e: GoogleAppsScript.Addons.EventObject) {
  return [CardService.newCardBuilder().build()];
}
