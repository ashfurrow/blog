---
title: "Unit Testing Objective-C Using Kiwi"
date: 2013-01-17 00:00
---

<p>I have released <a href="https://github.com/AshFurrow/AFImageDownloader">AFImageDownloader</a> to the open source community. It, asynchronously, downloads JPEGs from the Internet and decompresses them on a background queue. </p>

<pre><code>[AFImageDownloader imageDownloaderWithURLString:@"http://static.ashfurrow.com./github/worked.jpg" autoStart:YES completion:^(UIImage *decompressedImage) {
    self.imageView.image = decompressedImage;
}];
</code></pre>

<p>Network calls obviously take a long time and must not be performed on the main thread. JPEG decompression can actually take a long time if it's performed on a large image or on small images very frequently. It can be a common cause of performance problems. </p>

<p>What I'm really excited about is that it is the first Objective-C project I've developed using strict TDD/BDD using <a href="https://github.com/allending/Kiwi">Kiwi</a>. Until I was completely finished writing the code, I had only tested it using unit tests — never letting it touch the Internet at all. The first time I ran it, it worked perfectly. </p>

<p>(While I think that blindly adhering to TDD may not be a wise choice for iOS development, I wanted to see if I were up to the challenge.)</p>

<p>Kiwi encourages <a href="http://en.wikipedia.org/wiki/Behavior-driven_development">Behaviour-Driven Development</a>. While the <a href="https://github.com/allending/Kiwi/wiki/Guide:-Up-and-Running-with-Kiwi">setup</a> is a little arduous, it was a joy to work with. </p>

<pre><code>describe(@"Image downloader", ^{
    NSString *urlString = @"http://example.com/image.jpeg";
    __block AFImageDownloader *imageDownloader;

    context(@"has been newly created", ^{
        beforeEach(^{
            imageDownloader = [[AFImageDownloader alloc] initWithURLString:urlString autoStart:NO completion:nil];
        });

        it (@"should create a new URL connection when started", ^{
            [[imageDownloader should] 
                receive:@selector(urlRequestForURLString)];
            [[imageDownloader should] 
                receive:@selector(urlConnectionForURLRequest:)];
            [imageDownloader start];
        });

        it (@"should return a URL request with the proper URL string", ^{
            NSURLRequest *request = [imageDownloader urlRequestForURLString];

            [[request.URL.absoluteString should] equal:urlString];
        });

        it (@"should start the new URL connection", ^{

            [imageDownloader start];
        });

        it (@"should be set it state to started when started", ^{
            NSURLConnection *urlConnectionMock = [NSURLConnection mock];
            [[urlConnectionMock should] receive:@selector(start)];

            [imageDownloader stub:@selector(urlConnectionForURLRequest:)
                andReturn:urlConnectionMock];

            [[imageDownloader should]
                receive:@selector(setState:) withArguments:theValue(AFImageDownloaderStateStarted), nil];
            [imageDownloader start];
        });
    });
});
</code></pre>

<p>I'm looking for any feedback you have about the code, the structure of the project, or the testing I've performed. </p>

<!-- more -->

