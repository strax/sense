export default function dataURI(mime: string) {
  return (parts: TemplateStringsArray) => `data:${mime};utf8,${parts.join()}§`;
}
