#!/bin/bash

DATA_DIR="/home/cache/stats/test/data"
SCRIPT_DIR="/home/cache/stats/test/scripts"
PID_FILE="${DATA_DIR}/dashing.pid"
LOG="${DATA_DIR}/dashing.log"
ERR_LOG="${DATA_DIR}/dashing_error.log"

start()
{
    if [ -e $PID_FILE ]
    then
        _pid=$(cat ${PID_FILE})
        if [ -e /proc/${_pid} ]
        then
            echo "Daemon already running with pid = $_pid"
            exit 0
        fi
    fi
    
    touch ${LOG}
    touch ${ERR_LOG}    
    cd ${SCRIPT_DIR}
    echo "Starting daemon"
    
    # Перенаправляем стандартный вывод, вывод ошибок и стандартный ввод
    exec > $LOG
    exec 2> $ERR_LOG
    exec < /dev/null

    nohup "${SCRIPT_DIR}/refresh.dashboard" &
    echo $! > ${PID_FILE}
}

stop()
{
    if [ -e ${PID_FILE} ]
    then
	_pid=$(cat ${PID_FILE})
        kill $_pid
        rt=$?
        if [ "$rt" == "0" ]
        then
    	    echo "Daemon stop"
        else
            echo "Error stop daemon"
        fi
    else
        echo "Daemon isn't running"
    fi
}

status() 
{
    if [ -e ${PID_FILE} ]
    then
        pid=$(cat ${PID_FILE})
        ps -ax | grep $pid
    else
        echo "Daemon isn't running"
    fi
    
}

usage()
{
    echo "$0 (start|stop|restart|status)"
}

_log()
{
    process=$1
    shift
    echo "${process}[$$]: $*"
}

case $1 in
    "start")
            start
            ;;
    "stop")
            stop
            ;;
    "status")
	    status
	    ;;
    "restart")
	    stop
	    start
	    ;;
    *)
	    usage
    	    ;;
esac
exit