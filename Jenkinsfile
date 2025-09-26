pipeline{
    agent {
        docker {
            image 'node:22'
            args '-u root:root'
        }
    }
    stages{
        stage("Clean Workspace"){
            steps{
                echo "========Executing Clean Workspace========"
                cleanWs();
            }
            post{
                success{
                    echo "========Clean Workspace executed successfully========"
                }
                failure{
                    echo "========Clean Workspace execution failed========"
                }
            }
        }
        stage("Code Quality Check"){
            steps{
                echo "========Executing Code Quality Check========"
            }
            post{
                success{
                    echo "========Code Quality Check executed successfully========"
                }
                failure{
                    echo "========Code Quality Check execution failed========"
                }
            }
        }
        stage("Build Artifact"){
            steps{
                echo "========Executing Build Artifact========"
            }
            post{
                success{
                    echo "========Build Artifact executed successfully========"
                }
                failure{
                    echo "========Build Artifact execution failed========"
                }
            }
        }
        stage("Push Artifact"){
            steps{
                echo "========Push Build Artifact========"
            }
            post{
                success{
                    echo "========Push Artifact executed successfully========"
                }
                failure{
                    echo "========Push Artifact execution failed========"
                }
            }
        }
    }
    post{
        always{
            echo "========Pipeline Finished========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}