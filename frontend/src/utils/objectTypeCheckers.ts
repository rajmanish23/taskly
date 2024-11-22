export function isAPIErrorMessage(obj: unknown): obj is APIErrorMessage {
  return (obj as APIErrorMessage).detail !== undefined;
}

export function isTask(obj: unknown): obj is Task {
  return (obj as Task).subTasks !== undefined;
}