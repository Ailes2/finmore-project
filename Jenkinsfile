pipeline {
    agent any
 
    environment {
        NODE_ENV = 'test'
    }
 
    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }
 
        stage('Run Playwright tests') {
            steps {
                echo 'Running Playwright tests...'
                // Запуск тестів
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