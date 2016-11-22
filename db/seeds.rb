1.upto(200) do |i|
  Event.create(name: "Event #{i}",
               description: "It's sample event witn number #{i}",
               event_date: Date.today + rand(3).months,
               place: "Random place number #{i}")
end
