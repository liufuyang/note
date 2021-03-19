# ------------------------------------------------------------------------------
# Cargo Build Stage
# ------------------------------------------------------------------------------

FROM rust:latest as cargo-build

RUN cargo install mdbook mdbook-mermaid

# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM frolvlad/alpine-glibc

RUN apk update \
  && apk add --no-cache bash 

COPY --from=cargo-build /usr/local/cargo/bin/mdbook /bin/mdbook
COPY --from=cargo-build /usr/local/cargo/bin/mdbook-mermaid /bin/mdbook-mermaid

WORKDIR /github/workspace/
CMD ["mdbook"]

# docker run --rm -it -v $(pwd):/github/workspace liufuyang/mdbook-mermaid:0.4.7 mdbook build