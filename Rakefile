namespace :tags do
  task :generate do
    puts 'Generating tags...'
    require 'rubygems'
    require 'jekyll'
    include Jekyll::Filters

    options = Jekyll.configuration({})
    site = Jekyll::Site.new(options)
    site.read_posts('')

    html =<<-HTML
---
layout: default
title: Tags
---

    HTML

    site.categories.sort.each do |category, posts|
      html << <<-HTML
      <a name="#{category}"></a> 
      <h3 id="#{category}">#{category}</h3>
      HTML

      html << '<ul class="posts">'
      posts.reverse.each do |post|
        post_data = post.to_liquid
        html << <<-HTML
          <li>
            <div>#{date_to_string post.date}</div>
            <a href="#{post.url}">#{post_data['title']}</a>
          </li>
        HTML
      end
      html << '</ul>'
    end

    File.open('tags.html', 'w+') do |file|
      file.puts html
    end

    puts 'Done.'
  end
  
  task :build_feeds do
    puts 'Generating feeds for categories...'
    require 'rubygems'
    require 'jekyll'
    include Jekyll::Filters

    options = Jekyll.configuration({})
    site = Jekyll::Site.new(options)
    site.read_posts('')

    site.categories.sort.each do |category, posts|
      puts category
      html =<<-XML
---
layout: nil
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

 <title>Springenwerk Blog by Johannes Fahrenkrug</title>
 <link href="http://blog.springenwerk.com/atom-#{category}.xml" rel="self"/>
 <link href="http://blog.springenwerk.com/"/>
 <updated>{{ site.time | date_to_xmlschema }}</updated>
 <id>http://blog.springenwerk.com/</id>
 <author>
   <name>Johannes Fahrenkrug</name>
   <email>johannes@springenwerk.com</email>
 </author>
{% for post in site.posts %}
{% if post.categories contains '#{category}' %} 
  <entry>
    <title>{{ post.title }}</title>
    <link href="http://blog.springenwerk.com{{ post.url }}"/>
    <updated>{{ post.date | date_to_xmlschema }}</updated>
    <id>http://blog.springenwerk.com{{ post.id }}</id>
    <content type="html">{{ post.content | xml_escape }}</content>
  </entry>
{% endif %}
{% endfor %}
</feed>
        XML
      
      File.open("feeds/atom-#{category}.xml", 'w+') do |file|
        file.puts html
      end
    end
    
    puts 'Done.'
  end
end

task :default => ['tags:build_feeds', 'tags:generate']