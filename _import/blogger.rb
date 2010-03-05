module Jekyll
 
  require 'rexml/document'
  require 'time'
  require "YAML"
  
  require 'rubygems'
  require 'gdata'
  require 'atom'
 
  module Blogger
    BLOG_ID = '4366452231084261097'
    MAX_POSTS = 10
    
    #Reads posts from a Blogger blog
    #It creates a post file for each entry in the blog.
    def self.process
      client = GData::Client::Blogger.new
      feed = client.get("http://www.blogger.com/feeds/#{BLOG_ID}/posts/default?max-results=#{MAX_POSTS}").to_xml

      feed = Atom::Feed.new(feed.to_s)
               
      #FileUtils.mkdir_p "_posts"
      content = ""
      posts = 0
      
      feed.entries.each do |entry|
        timestamp = entry.published
        
        link_obj = entry.links.select {|l| l.rel == 'alternate' and l.type == 'text/html'}
        
        if link_obj and link_obj[0].href =~ /\d+\/\d+\/(.+)\.html/
          link = link_obj[0].href
          name = $1
        end

        title = entry.title.to_s
        content = entry.content.value
        filename = "_posts/#{timestamp.strftime("%Y-%m-%d")}-#{name}.html"
        puts "#{link} -> #{filename}"
        File.open(filename, "w") do |f|
          YAML.dump(
            {
              "layout" => "post",
              "name" => name,
              "title" => title,
              "time" => timestamp,
            },
            f
          )
          f.puts "---\n#{content}"
        end
        posts += 1
      end
      
      puts "Created #{posts} posts!"
    end
  end
end