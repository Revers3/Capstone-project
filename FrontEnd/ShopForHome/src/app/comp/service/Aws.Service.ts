import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AwsS3Service {
  private s3Client: S3Client;

  constructor(private http: HttpClient) {
    this.s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: 'AKIAUW4RAVIFP33L5ZWN',
        secretAccessKey: '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',
      },
    });
  }

  async uploadFile(file: File): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: 'shopforhomebucket',
      Key: file.name,
      Body: file,
      ContentType: file.type,
    });

    try {
      const response = await this.s3Client.send(command);
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  getS3Client(): S3Client {
    return this.s3Client;
  }

  getImage(url: string): Promise<Blob> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(response => {
        if (response === undefined) {
          throw new Error('Image not found');
        }
        return response;
      });
  }
}
