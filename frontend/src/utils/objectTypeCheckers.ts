export function isAPIErrorMessage(obj: unknown): obj is APIErrorMessage {
  return (obj as APIErrorMessage).detail !== undefined;
}
