FROM ruby:3.3.6

RUN apt-get update -qq && apt-get install -y \
    build-essential postgresql-client libpq-dev vim-gtk3

WORKDIR /myapp

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

# RUN chmod +x ./bin/entrypoint.sh
# ENTRYPOINT ["./bin/entrypoint.sh"]

EXPOSE 4001

# CMD ["rails", "server", "-b", "0.0.0.0"]