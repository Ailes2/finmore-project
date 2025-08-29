pipeline {
    agent any
 
    tools {
        nodejs 'NodeJS' 
    }
 
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
 
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright install'
                sh 'npx playwright test --reporter=line'
            }
        }
 
        stage('Publish report') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}
