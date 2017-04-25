data "archive_file" "lambdazip" {
  type        = "zip"
  source_dir  = "${path.module}/../_build"
  output_path = "${path.module}/../lambda.zip"
}

resource "aws_s3_bucket" "default" {
  bucket = "${var.s3_bucket_name}"
  acl    = "private"

  tags {
    Name        = "${var.s3_bucket_name}"
    Environment = "Development"
  }
}

resource "aws_s3_bucket_object" "default" {
  bucket = "${aws_s3_bucket.default.bucket}"
  key    = "slackbot"
  source = "${path.module}/../lambda.zip"
  etag   = "${data.archive_file.lambdazip.output_md5}"
}
