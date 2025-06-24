"use client";

import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";

function schematicEmbed({
  accessToken,
  componentId,
}: {
  accessToken: string;
  componentId: string;
}) {
  return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
}

export default schematicEmbed;
