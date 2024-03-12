function addEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventNotes = document.getElementById('eventNotes').value;

    const newEvent = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        notes: eventNotes
    };

    // Retrieve existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    // Add the new event to the array
    existingEvents.push(newEvent);

    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Clear the form fields
    document.getElementById('add-event-form').reset();

    // Refresh the event list
    displayEvents(existingEvents);
}

function displayEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `
            <div>
                <strong>${event.name}</strong><br>
                Date: ${event.date}<br>
                Time: ${event.time}<br>
                Location: ${event.location}<br>
                Notes: ${event.notes}
            </div>
            <div>
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>
            </div>
        `;
        eventList.appendChild(eventItem);
    });
}

function editEvent(index) {
    // Retrieve existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    // Retrieve the event at the specified index
    const editedEvent = existingEvents[index];

    // Populate the form fields with the event data for editing
    document.getElementById('eventName').value = editedEvent.name;
    document.getElementById('eventDate').value = editedEvent.date;
    document.getElementById('eventTime').value = editedEvent.time;
    document.getElementById('eventLocation').value = editedEvent.location;
    document.getElementById('eventNotes').value = editedEvent.notes;

    // Remove the original event from the array
    existingEvents.splice(index, 1);

    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Refresh the event list
    displayEvents(existingEvents);
}
function deleteEvent(index) {
    // Retrieve existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    // Remove the event at the specified index
    existingEvents.splice(index, 1);

    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Refresh the event list
    displayEvents(existingEvents);
}

function searchEvent() {
    const searchText = document.getElementById('searchText').value.toLowerCase();

    // Retrieve existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

    // Filter events based on search text
    const filteredEvents = existingEvents.filter(event => {
        return (
            event.name.toLowerCase().includes(searchText) ||
            event.date.includes(searchText) ||
            event.location.toLowerCase().includes(searchText)
        );
    });

    // Refresh the event list with filtered events
    displayEvents(filteredEvents);
}

// Initial event data should be loaded from localStorage
const initialEvents = JSON.parse(localStorage.getItem('events')) || [];
displayEvents(initialEvents);