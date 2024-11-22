export function isAPIErrorMessage(obj: unknown): obj is APIErrorMessage {
  return (obj as APIErrorMessage).detail !== undefined;
}

export function isTagAPIConvertedData(obj: unknown): obj is TagAPIConvertedData {
  return (obj as TagAPIConvertedData).colorHex !== undefined
}

export function isTask(obj: unknown): obj is Task {
  return (obj as Task).subTasks !== undefined;
}
