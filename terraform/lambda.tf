resource "aws_iam_role_policy" "logs_policy" {
  name = "logs_policy"
  role = "${aws_iam_role.iam_for_lambda.name}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": "arn:aws:logs:*:*:*",
      "Action": [
        "logs:*"           
      ]       
    }    
  ]
}
POLICY
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda_slack"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "default" {
  s3_bucket        = "${aws_s3_bucket.default.id}"
  runtime          = "nodejs4.3"
  function_name    = "${var.lambda_function_name}"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
  handler          = "index.handler"
  s3_key           = "${aws_s3_bucket_object.default.id}"
  source_code_hash = "${data.archive_file.lambdazip.output_md5}"

  environment = {
    variables = {
      SLACK_API_KEY = "${var.slack_api_key}"
    }
  }
}
