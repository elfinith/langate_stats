﻿$(document).ready(function() {

	var months = new Array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');	
	var intPointInterval = 600 * 1000; // 10 Минут									
	var current_date = new Date();
	var curYear = current_date.getFullYear();			
	var month_value = current_date.getMonth();				
	
	<!-- Настройки графика 1 -->															
	var chart1options = {
		chart: {
			renderTo: 'container1',
			zoomType: 'x'
		},
		title: {
			text: 'Статистика соединений (почта) с начала ' + months[month_value] + ' месяца'
		},
		xAxis: {
			type: 'datetime',
			minRange: 10 
		},
		yAxis: [{
			title: {
				text: 'Соединений'
			},					
			min: 0
		}, {
			gridLineWidth: 0,
			opposite: true,
		    labels: {
				format: '{value}%',
			},
			title: {
				text: 'Использование ресурсов'
			},
			min: 0,
			max: 100,					
		}],
		legend: {
			enabled: true
		},
		tooltip: {
			shared: true
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: [] 
	};
	
	<!-- Настройки графика 2 -->													
	var chart2options = {
		chart: {
			renderTo: 'container2',
			zoomType: 'x'
		},
		title: {
			text: 'Замеры скорости приёма/передачи данных на сетевых интерфейсах'
		},
		xAxis: {
			type: 'datetime',
			minRange: 10 
		},
		yAxis: [{
		    labels: {
				format: '{value} Mб',
			},				
			title: {
				text: 'Скорость передачи данных'
			},
			min: 0
		}, {
			gridLineWidth: 0,
			opposite: true,				
			title: {
				text: 'Соединений'
			},
			min: 0					
		}],
		legend: {
			enabled: true
		},
		tooltip: {
			shared: true
		},	
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: []
	};
	<!-- Настройки графика 3 -->													
	var chart3options = {
		chart: {
			renderTo: 'container3',
			zoomType: 'x'
		},
		title: {
			text: 'Объём данных на сетевых интерфейсах'
		},
		xAxis: {
			type: 'datetime',
			minRange: 10 
		},
		yAxis: {
		    labels: {
				format: '{value} Мб',
			},				
			title: {
				text: 'Объём данных'
			},
			min: 0
		},
		legend: {
			enabled: true
		},
		tooltip: {
			shared: true
		},	
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: []
	};
	
	<!-- Настройки графика 4 -->													
	var chart4options = {
		chart: {
			renderTo: 'container4',
			zoomType: 'x'
		},
		title: {
			text: 'Количество сессий удалённого подключения'
		},
		xAxis: {
			type: 'datetime',
			minRange: 10 
		},
		yAxis: {
			title: {
				text: 'Соединений'
			},					
			min: 0
		},
		legend: {
			enabled: true
		},
		tooltip: {
			shared: true
		},	
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: []
	};
	
	
	<!-- Формирование графика 1 -->										
	$.get('data/owa.oat-group.ru.count.csv', function(data) {			
		var lines = data.split('\n');
		var datPointStart = Date.UTC(curYear, month_value, 1, 4, 10);
		var series1 = {
			type: 'area',
			name: 'owa.oat-group.ru (Все соединения с Exchange)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series2 = {
	        type: 'area',
			name: 'LAN (IMAP-соединения с Davmail)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series3 = {
			type: 'line',
			name: '% Процессор (Davmail)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			yAxis: 1,
			data: []
		};
		var series4 = {
			type: 'line',
			name: '% Память (Davmail)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			yAxis: 1,					
			data: []
		};
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');
			$.each(items, function(itemNo, item) {						
				switch (itemNo) {
					case 2: series1.data.push(parseInt(item)); break
					case 3: series2.data.push(parseInt(item)); break
					case 4: series3.data.push(parseInt(item)); break   
					case 5: series4.data.push(parseInt(item)); break
					default: break
				}						
			});
		});
		chart1options.series.push(series1);
		chart1options.series.push(series2);
		chart1options.series.push(series3);
		chart1options.series.push(series4);
		var chart = new Highcharts.Chart(chart1options);															
	});		
	
	<!-- Формирование графика 2 -->												
	$.get('data/speed.ifaces.csv', function(data) {			
		var linesSpd = data.split('\n');
		var arrStartString = linesSpd[0].split(',');				
		var datPointStart = Date.UTC(parseInt(arrStartString[0].substr(0,4)), parseInt(arrStartString[0].substr(5,2)) - 1, 
			parseInt(arrStartString[0].substr(8,2)), parseInt(arrStartString[1].substr(0,2)), parseInt(arrStartString[1].substr(3,2)));					
		var series5 = {
			type: 'area',
			name: 'LAN приём',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series6 = {
	        type: 'area',
			name: 'LAN передача',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series7 = {
			type: 'area',
			name: 'WAN приём',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series8 = {
			type: 'area',
			name: 'WAN передача',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series9 = {
			type: 'line',
			name: 'LAN соединений',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			yAxis: 1,					
			data: []
		};
		var series10 = {
			type: 'line',
			name: 'WAN соединений',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			yAxis: 1,					
			data: []
		};
		
		$.each(linesSpd, function(lineNo, line) {
			var items = line.split(',');
			$.each(items, function(itemNo, item) {						
				switch (itemNo) {
					<!-- Округление до 2-х знаков после запятой хитрым макаром (round(x*100)/100) -->
					case 2: series5.data.push(Math.round(parseInt(item)/10.24)/100); break
					case 3: series6.data.push(Math.round(parseInt(item)/10.24)/100); break
					case 4: series7.data.push(Math.round(parseInt(item)/10.24)/100); break   
					case 5: series8.data.push(Math.round(parseInt(item)/10.24)/100); break
					case 6: series9.data.push(parseInt(item)); break   
					case 7: series10.data.push(parseInt(item)); break						
					default: break
				}						
			});
		});
		chart2options.series.push(series5);
		chart2options.series.push(series6);
		chart2options.series.push(series9);				
		chart2options.series.push(series7);
		chart2options.series.push(series8);
		chart2options.series.push(series10);								
		var chart = new Highcharts.Chart(chart2options);											
	});				
	<!-- Формирование графика 3 -->												
	$.get('data/traffic.ifaces.csv', function(data) {			
		var linesTfc = data.split('\n');
		var arrStartString = linesTfc[0].split(',');				
		var datPointStart = Date.UTC(parseInt(arrStartString[0].substr(0,4)), parseInt(arrStartString[0].substr(5,2)) - 1, 
			parseInt(arrStartString[0].substr(8,2)), parseInt(arrStartString[1].substr(0,2)), parseInt(arrStartString[1].substr(3,2)));					
		var series11 = {
			type: 'area',
			name: 'LAN принято',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series12 = {
	        type: 'area',
			name: 'LAN передано',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series13 = {
			type: 'area',
			name: 'WAN принято',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series14 = {
			type: 'area',
			name: 'WAN передано',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};				
		
		function prepData(value) {
			var maxTrafficValue = 4294967296;
			if (value <= 0) {									
				// Округление до 2-х знаков после запятой хитрым макаром (round(x*100)/100)
				// умножение на 125 из-за того, что в логах хранятся разности переведённые в килобиты (возвращение в байты)
				return Math.round(((value*125 + maxTrafficValue)*100)/100/1024/1024); 																									
			}
			else {
				return Math.round((value*100*125/1024/1024)/100); 																
			}												
			
		}			
		
		$.each(linesTfc, function(lineNo, line) {
			var items = line.split(',');
			$.each(items, function(itemNo, item) {						
				switch (itemNo) {
					case 2: series11.data.push(prepData(parseInt(item))); break
					case 3: series12.data.push(prepData(parseInt(item))); break
					case 4: series13.data.push(prepData(parseInt(item))); break							
					case 5: series14.data.push(prepData(parseInt(item))); break							
					default: break
				}						
			});
		});
		chart3options.series.push(series11);
		chart3options.series.push(series12);
		chart3options.series.push(series13);				
		chart3options.series.push(series14);
		var chart = new Highcharts.Chart(chart3options);											
	});					

	<!-- Формирование графика 4 -->										
	$.get('data/remote.sessions.count.csv', function(data) {			
		var lines = data.split('\n');
		var datPointStart = Date.UTC(curYear, month_value, 1, 4, 10);
		var series15 = {
			type: 'area',
			name: 'RDP',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series16 = {
	        type: 'area',
			name: 'VPN (авторизованные сессии)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series17 = {
			type: 'area',
			name: 'VPN (всего подключений)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		var series18 = {
			type: 'line',
			name: 'SSH (всего подключений)',
			pointInterval: intPointInterval,
			pointStart: datPointStart,
			data: []
		};
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');
			$.each(items, function(itemNo, item) {						
				switch (itemNo) {
					case 2: series15.data.push(parseInt(item)); break
					case 3: series16.data.push(parseInt(item)); break
					case 4: series17.data.push(parseInt(item)); break   
					case 5: series18.data.push(parseInt(item)); break
					default: break
				}						
			});
		});
		chart4options.series.push(series15);
		chart4options.series.push(series16);
		chart4options.series.push(series17);
		chart4options.series.push(series18);
		var chart = new Highcharts.Chart(chart4options);															
	});		

	
	<!-- Загрузка лога ошибок -->				
	$("#iframe").load(setWidth);
	<!-- Изменение размера iframe -->							
	function setWidth(){
		var iFrame = $(this, parent.document.body);
		iFrame.width($(document.body).width() - 20);
	}			
});
