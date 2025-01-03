export function isAPIStatusMessage(obj: unknown): obj is APIStatusMessage {
  return (obj as APIStatusMessage).detail !== undefined;
}

export function isTagAPIConvertedData(
  obj: unknown
): obj is TagAPIConvertedData {
  return (obj as TagAPIConvertedData).colorHex !== undefined;
}

export function isTask(obj: unknown): obj is Task {
  return (obj as Task).subTasks !== undefined;
}

export function isTag(obj: unknown): obj is Tag {
  return (obj as Tag).colorHex !== undefined;
}
