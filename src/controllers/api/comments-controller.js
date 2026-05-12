import { NextResponse } from "next/server";
import { listCommentsByCamperId, createComment } from "@/services/comment-service";

export async function handleListComments(camperModelId) {
  const comments = await listCommentsByCamperId(camperModelId);
  return NextResponse.json(comments);
}

export async function handleCreateComment(body, userId) {
  if (!body?.camperModelId || !body?.content) {
    return NextResponse.json(
      { error: "camperModelId i content son obligatoris" },
      { status: 400 }
    );
  }

  const content = String(body.content).trim();
  if (content.length < 3) {
    return NextResponse.json({ error: "Comentari massa curt" }, { status: 400 });
  }

  const comment = await createComment({
    camperModelId: String(body.camperModelId),
    userId,
    content,
  });

  return NextResponse.json(comment, { status: 201 });
}
