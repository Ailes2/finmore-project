pipeline {
    agent any
 
    environment {
        NODE_ENV = 'test'
    }
 
    stages {
        stage('Run Playwright tests in Docker') {
            steps {
                echo 'Running Playwright tests inside Docker container...'
                sh '''
                docker run --rm -v $PWD:/tests -w /tests mcr.microsoft.com/playwright:v1.48.2-focal \
                bash -c "npm ci && npx playwright test --reporter=list"
                '''
            }
        }
 
        stage('Publish report') {
            steps {
                echo 'Publishing Playwright report...'
                sh '''
                docker run --rm -v $PWD:/tests -w /tests mcr.microsoft.com/playwright:v1.48.2-focal \
                npx playwright show-report
                '''
            }
        }
    }
 
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline finished successfully!'
        }
    }
}