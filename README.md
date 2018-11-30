# Serverless - Demo

https://serverless.com/framework/docs/providers/aws/guide/intro/

https://github.com/awslabs/aws-lambda-rust-runtime

https://serverless.com/examples/aws-node-github-webhook-listener/

https://medium.com/openwhisk/openwhisk-and-rust-lang-24025734a834

https://serverless.com/examples/

```sh
npm install --global serverless

mkdir -p /tmp/serverless/demo
cd !$

# create a new .NET Core Lambda project
sls create --template aws-csharp

# configure AWS credentials
sls config credentials --provider aws --key $AWS_KEY --secret $AWS_SECRET

bash ./build.sh
sls deploy
```