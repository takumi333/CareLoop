FROM --platform=linux/amd64 ruby:3.3.6

RUN apt-get update -qq && apt-get install -y \
    build-essential postgresql-client libpq-dev vim-gtk3

WORKDIR /myapp

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]