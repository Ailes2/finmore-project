pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.2-focal'
            args '--user 1000:1000'
        }
    }
 
    environment {
        NODE_ENV = 'test'
    }
 
    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                sh 'npm ci'
            }
        }
 
        stage('Run Playwright tests') {
            steps {
                echo 'Running Playwright tests...'
                sh 'npx playwright test --reporter=list'
            }
        }
 
        stage('Publish report') {
            steps {
                echo 'Publishing Playwright report...'
                sh 'npx playwright show-report'
            }
        }
    }
 
    post {
        always {
            echo 'Cleaning up...'
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