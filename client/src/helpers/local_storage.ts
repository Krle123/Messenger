function SaveValueByKey(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`An error has occurred while saveing value into localStorage by key '${key}':`, error)
    return false
  }
}

function ReadValueByKey(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`An error has occurred while reading value from localStorage by key '${key}':`, error)
    return null
  }
}

function DeleteValueByKey(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`An error has occurred while deleting value from localStorage by key '${key}':`, error)
    return false
  }
}

export { SaveValueByKey, ReadValueByKey, DeleteValueByKey };