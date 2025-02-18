# <YOUR_APP_NAME>

Built with [Wasp](https://wasp.sh), based on the [Open Saas](https://opensaas.sh) template.

## Development

### Running locally
 - Make sure you have the `.env.client` and `.env.server` files with correct dev values in the root of the project.
 - Run the database with `wasp start db` and leave it running.
 - Run `wasp start` and leave it running.
 - [OPTIONAL]: If this is the first time starting the app, or you've just made changes to your entities/prisma schema, also run `wasp db migrate-dev`.

## Deployment Setup

### Prerequisites
- AWS Account with appropriate permissions
- EC2 instance (t3.small) with Docker installed
- RDS instance for the database
- ECR repository for Docker images
- GitHub repository with the Wasp application

### AWS Setup

1. Create two ECR repositories:
```bash
# Create backend repository
aws ecr create-repository --repository-name wasp-app-backend --region your-region

# Create frontend repository
aws ecr create-repository --repository-name wasp-app-frontend --region your-region
```

2. Set up EC2 instance:
   - Launch a t3.small instance with Amazon Linux 2
   - Configure security group to allow:
     - Inbound traffic on port 80 (for frontend)
     - Inbound traffic on port 3001 (for backend)
   - Install Docker:
     ```bash
     sudo yum update -y
     sudo yum install -y docker
     sudo service docker start
     sudo usermod -a -G docker ec2-user
     ```
   - Install AWS CLI and configure it with appropriate permissions

3. Create an RDS instance for your database

### GitHub Secrets Setup

Add the following secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `EC2_HOST`: Your EC2 instance public IP or DNS
- `SSH_PRIVATE_KEY`: SSH private key for EC2 instance access
- `DATABASE_URL`: Your RDS connection string
- `JWT_SECRET`: Secret for JWT token generation
- `WASP_WEB_CLIENT_URL`: Your application's public URL

### Environment Variables

Make sure to set these environment variables in your EC2 instance:
```bash
export DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/dbname
export JWT_SECRET=your-secret-key
export WASP_WEB_CLIENT_URL=http://your-domain:3001
```

### Deployment Process

1. Push your code to the main branch
2. GitHub Actions will automatically:
   - Build the Wasp application
   - Create a Docker image
   - Push the image to ECR
   - Deploy to your EC2 instance

### Manual Deployment

To manually trigger deployment:
1. Go to your GitHub repository
2. Navigate to Actions
3. Select the "Deploy to AWS EC2" workflow
4. Click "Run workflow"

### Monitoring

To check the deployment status:
1. View the GitHub Actions logs in your repository
2. SSH into your EC2 instance and check Docker logs:
```bash
docker logs wasp-app
```

### Troubleshooting

If the deployment fails:
1. Check GitHub Actions logs for build errors
2. Verify EC2 instance has sufficient permissions to pull from ECR
3. Ensure all environment variables are properly set
4. Check Docker logs on the EC2 instance

### Architecture Overview

The deployment sets up:
1. Frontend container (nginx) serving the React app on port 80
2. Backend container (Node.js) running the Wasp server on port 3001
3. Docker network for container communication
4. Nginx reverse proxy configuration for API requests

The frontend container serves the static files and proxies API requests to the backend container through the internal Docker network.

