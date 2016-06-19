/*
 dhtmlxScheduler v.4.2.0 Stardard

 This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

 (c) Dinamenta, UAB.
 */
//Initial idea and implementation by Steve MC
scheduler._temp_key_scope = function (){

	scheduler.config.key_nav = true;

	var date; // used for copy and paste operations
	var section; // used for copy and paste operations
	var isCopy = null;
	var bCtrl  = false;
	var copiedEvs = null;
	var chooseDate = null;

	scheduler.attachEvent("onMouseMove", function(id,e){
		date = scheduler.getActionData(e).date;
		//console.log(date);
		section = scheduler.getActionData(e).section;
	});




	function clear_event_after(ev){
		delete evs[i].rec_type; delete evs[i].rec_pattern;
		delete evs[i].event_pid; delete evs[i].event_length;
	}
	scheduler._make_pasted_event = function(ev){
		var event_duration = evs[i].end_date-evs[i].start_date;

		var copy = scheduler._lame_copy({}, ev);
		clear_event_after(copy);
		copy.start_date = new Date(date);
		copy.end_date = new Date(copy.start_date.valueOf() + event_duration);

		if(section){
			var property = scheduler._get_section_property();

			if(scheduler.config.multisection)
				copy[property] = ev[property]; // save initial set of resources for multisection view
			else
				copy[property] = section;
		}
		return copy;
	};
	scheduler._do_paste = function(is_copy, modified_ev, original_ev){
		scheduler.addEvent(modified_ev);
		scheduler.callEvent("onEventPasted", [is_copy, modified_ev, original_ev]);
	};

	scheduler._is_key_nav_active = function(){
		if(this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav){
			return true;
		}
		return false;
	};

	dhtmlxEvent(document,(_isOpera?"keypress":"keydown"),function(e){
		if(!scheduler._is_key_nav_active()) return true;

		e=e||event;

		if (e.keyCode == 27) {  // ESC
			chooseDate = null;
		}

		if (e.ctrlKey)
		{
			bCtrl = true;
		}
		if (e.keyCode == 37 || e.keyCode == 39) { // Left, Right arrows
			e.cancelBubble = true;

			var next = scheduler.date.add(scheduler._date,(e.keyCode == 37 ? -1 : 1 ),scheduler._mode);
			scheduler.setCurrentView(next);
			return true;
		}

		var select_id = scheduler._select_id;
		if (e.ctrlKey && e.keyCode == 67) {  // CTRL+C
			isCopy = true;
			chooseDate = date;
			//console.log(chooseDate);
			return true;

		}

		// add visionone
		if (e.keyCode == 46) {
			// remove all evet of pasted day before adding
			var	fromDate2 = scheduler.date.date_part(date);
			var toDate2 = scheduler.date.add(fromDate2, 1, 'day');
			var existEv = scheduler.getEvents(fromDate2,toDate2);

			for(var j=0;j<existEv.length; j++){
				scheduler.deleteEvent(existEv[j].id);
			}
		}

		if (e.ctrlKey && e.keyCode == 88) { // CTRL+X

			//if (select_id) {
			//	console.log(select_id);
			//	isCopy = false;
			//	chooseDate = date;
			//	scheduler._buffer_id = select_id;
			//	var ev = scheduler.getEvents(select_id);
			//	scheduler.updateEvent(evs[i].id);
			//	scheduler.deleteEvent(existEv[j].id);
			//	scheduler.callEvent("onEventCut", [ev]);
			//}
		}

		var bCleanExistEv = false;
		if (e.ctrlKey && e.keyCode == 86) {  // CTRL+V

			if (chooseDate!= null)
			{
				var fromDate = scheduler.date.date_part(chooseDate);
				var toDate = scheduler.date.add(fromDate, 1, 'day');

				var evs = scheduler.getEvents(chooseDate,toDate);
				for(var i=0;i<evs.length; i++){
					var event_duration = evs[i].end_date-evs[i].start_date;
					var new_ev = scheduler._lame_clone(evs[i]);
					new_ev.id = scheduler.uid();

					var dayDuration = date.getDate() - chooseDate.getDate();
					//var newDate = scheduler.date.add(evs[i].start_date, dayDuration, 'day');
					// modify new date
					var pastedDate = scheduler.date.date_part(date);
					var minutePart = scheduler.date.time_part(evs[i].start_date)/60;
					var newDate = scheduler.date.add(pastedDate, minutePart, 'minute');

					new_ev.start_date = new Date(newDate);
					new_ev.end_date = new Date(new_ev.start_date.valueOf() + event_duration);

					// remove all evet of pasted day before adding
					var	fromDate2 = scheduler.date.date_part(date);
					var toDate2 = scheduler.date.add(fromDate2, 1, 'day');
					var existEv = scheduler.getEvents(fromDate2,toDate2);

					if (!bCleanExistEv)
					{
						for(var j=0;j<existEv.length; j++){
							scheduler.deleteEvent(existEv[j].id);
						}
						bCleanExistEv = true;
					}

					// end of Remove
					//console.log(new_ev.text);
					scheduler.addEvent(new_ev);
				}
			};
			//chooseDate = null;
			return true;
		}


	});

};
scheduler._temp_key_scope();
