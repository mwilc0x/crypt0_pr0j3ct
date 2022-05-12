FROM mysql:latest
ADD entrypoint.sh /tmp
RUN chmod +x /tmp/entrypoint.sh
RUN ./tmp/entrypoint.sh
# Add a new user "john" with user id 8877
RUN useradd -u 8877 mike
# Change to non-root privilege
USER mike