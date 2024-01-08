import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '@/entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  //   async createComment(
  //     blogId: string,
  //     content: string,
  //     userId: string,
  //   ): Promise<Comment> {
  //     try {
  //       const comment = this.commentRepository.create();
  //       return await this.commentRepository.save(comment);
  //     } catch (error: any) {
  //       throw new Error(`Failed to create comment: ${error.message}`);
  //     }
  //   }

  //   async getCommentById(commentId: string): Promise<Comment> {
  //     try {
  //       const comment = await this.commentRepository.findOne(commentId);
  //       if (!comment) {
  //         throw new NotFoundException(`Comment with ID ${commentId} not found`);
  //       }
  //       return comment;
  //     } catch (error: any) {
  //       throw new Error(`Failed to retrieve comment: ${error.message}`);
  //     }
  //   }

  //   async updateComment(commentId: string, content: string): Promise<Comment> {
  //     try {
  //       // delete comment is update comment to an empty one
  //       const comment = await this.getCommentById(commentId);
  //       comment.content = content;
  //       return await this.commentRepository.save(comment);
  //     } catch (error: any) {
  //       throw new Error(`Failed to update comment: ${error.message}`);
  //     }
  //   }
}
